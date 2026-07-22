"use client";

import { useMemo } from "react";
import { createPluginRegistration } from "@embedpdf/core";
import { EmbedPDF } from "@embedpdf/core/react";
import { usePdfiumEngine } from "@embedpdf/engines/react";
import {
  Viewport,
  ViewportPluginPackage,
} from "@embedpdf/plugin-viewport/react";
import { Scroller, ScrollPluginPackage } from "@embedpdf/plugin-scroll/react";
import {
  DocumentContent,
  DocumentManagerPluginPackage,
} from "@embedpdf/plugin-document-manager/react";
import {
  RenderLayer,
  RenderPluginPackage,
} from "@embedpdf/plugin-render/react";
import { ZoomPluginPackage } from "@embedpdf/plugin-zoom/react";
import { ZoomMode } from "@embedpdf/plugin-zoom";

interface ResumeViewerProps {
  resumeUrl: string;
}

export default function ResumeViewer({ resumeUrl }: ResumeViewerProps) {
  const { engine, isLoading } = usePdfiumEngine();

  const plugins = useMemo(() => {
    if (!resumeUrl) return [];
    return [
      createPluginRegistration(DocumentManagerPluginPackage, {
        initialDocuments: [{ url: resumeUrl }],
      }),
      createPluginRegistration(ViewportPluginPackage),
      createPluginRegistration(ScrollPluginPackage),
      createPluginRegistration(RenderPluginPackage),
      createPluginRegistration(ZoomPluginPackage, {
        defaultZoomLevel: ZoomMode.FitWidth,
      }),
    ];
  }, [resumeUrl]);

  if (!resumeUrl) {
    return (
      <div className="text-text-muted flex h-full items-center justify-center font-bold tracking-wider uppercase">
        Resume URL not provided
      </div>
    );
  }

  if (isLoading || !engine) {
    return (
      <div className="text-text-muted flex h-full items-center justify-center font-bold tracking-wider uppercase">
        Loading PDF Engine...
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <EmbedPDF engine={engine} plugins={plugins}>
        {({ activeDocumentId }) =>
          activeDocumentId && (
            <DocumentContent documentId={activeDocumentId}>
              {({ isLoaded }) =>
                isLoaded ? (
                  <Viewport
                    documentId={activeDocumentId}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Scroller
                      documentId={activeDocumentId}
                      renderPage={({ width, height, pageIndex }) => (
                        <div
                          style={{
                            width,
                            height,
                            margin: "0 auto 16px auto",
                            backgroundColor: "white",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          <RenderLayer
                            documentId={activeDocumentId}
                            pageIndex={pageIndex}
                          />
                        </div>
                      )}
                    />
                  </Viewport>
                ) : (
                  <div className="text-text-muted flex h-full items-center justify-center font-bold tracking-wider uppercase">
                    Loading PDF...
                  </div>
                )
              }
            </DocumentContent>
          )
        }
      </EmbedPDF>
    </div>
  );
}
