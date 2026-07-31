"use client";

import posthog from "posthog-js";

interface TrackedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
  eventProps?: Record<string, string | null>;
}

// Anchor with a PostHog capture, for use inside server components
const TrackedLink = ({
  event,
  eventProps,
  children,
  ...anchorProps
}: TrackedLinkProps) => {
  return (
    <a {...anchorProps} onClick={() => posthog.capture(event, eventProps)}>
      {children}
    </a>
  );
};

export default TrackedLink;
