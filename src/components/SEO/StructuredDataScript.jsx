// components/StructuredDataScript.jsx
'use client';

const StructuredDataScript = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};

export default StructuredDataScript;
