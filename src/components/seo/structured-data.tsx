import Script from "next/script";

interface StructuredDataProps {
  data: unknown;
  id?: string;
}

// Main component for injecting structured data
export function StructuredData({ data, id }: StructuredDataProps) {
  if (!data) return null;

  return (
    <Script
      id={id || "structured-data"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: typeof data === 'string' ? data : JSON.stringify(data, null, 0)
      }}
      strategy="afterInteractive"
    />
  );
}

// Convenience component for multiple schemas
interface MultipleStructuredDataProps {
  schemas: unknown[];
  id?: string;
}

export function MultipleStructuredData({ schemas, id }: MultipleStructuredDataProps) {
  const validSchemas = schemas.filter(schema => schema !== null && schema !== undefined);
  
  if (validSchemas.length === 0) return null;

  return (
    <Script
      id={id || "multiple-structured-data"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(validSchemas, null, 0)
      }}
      strategy="afterInteractive"
    />
  );
}