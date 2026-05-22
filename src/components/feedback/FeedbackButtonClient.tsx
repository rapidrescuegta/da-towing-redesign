"use client";

// Client wrapper that dynamic-imports FeedbackButton with ssr:false so the
// component never executes during server prerender. Without this, Next 16's
// auto-generated _global-error route fails to prerender because the feedback
// subtree calls usePathname() outside a router context. ssr:false is only
// permitted inside client components, hence this wrapper file.

import dynamic from "next/dynamic";

const FeedbackButton = dynamic(
  () =>
    import("./FeedbackButton").then((m) => ({
      default: m.FeedbackButton,
    })),
  { ssr: false }
);

export default function FeedbackButtonClient() {
  return <FeedbackButton />;
}
