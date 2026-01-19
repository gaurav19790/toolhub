import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const policy = `
Privacy Policy for ${data.website}

Last updated: ${new Date().toLocaleDateString()}

This Privacy Policy describes how ${data.website} ("we," "us," or "our") collects, uses, and discloses your information when you use our website located at ${data.url} (the "Service").

## Information We Collect

We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.

## How We Use Your Information

We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.

## Sharing of Information

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at ${data.email}.

This policy is compliant with ${data.country} data protection laws.
`;

  return NextResponse.json({ policy });
}