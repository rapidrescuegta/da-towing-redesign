import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs, servicesData } from "@/lib/services-data";
import ServicePageClient from "./ServicePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | D&A Towing & Storage`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Get related services (exclude current)
  const related = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return <ServicePageClient service={service} related={related} />;
}
