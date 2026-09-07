"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";

interface SectionErrorBoundaryProps {
  /** Reported to Sentry as the `section` tag so failures stay attributable. */
  name: string;
  children: ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolates a non-critical page section. A render error inside the section
 * hides the section instead of taking down the whole page, and is still
 * reported to Sentry.
 */
export default class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    Sentry.captureException(error, {
      tags: { section: this.props.name },
      extra: { componentStack: info.componentStack },
    });
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
