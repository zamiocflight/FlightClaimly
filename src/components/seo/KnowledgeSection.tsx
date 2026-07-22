import type { ReactNode } from "react";

type KnowledgeSectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export default function KnowledgeSection({
  children,
  className = "",
  containerClassName = "",
}: KnowledgeSectionProps) {
  return (
    <section className={`px-6 py-12 ${className}`.trim()}>
      <div
        className={`mx-auto max-w-5xl ${containerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}