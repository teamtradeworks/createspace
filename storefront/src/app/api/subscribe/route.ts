import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const CUSTOMER_CREATE_MUTATION = `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  const { email } = (await request.json()) as { email: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    const data = await shopifyFetch<{
      customerCreate: {
        customer: { id: string; email: string } | null;
        customerUserErrors: { field: string[]; message: string; code: string }[];
      };
    }>({
      query: CUSTOMER_CREATE_MUTATION,
      cache: "no-store",
      variables: {
        input: {
          email,
          acceptsMarketing: true,
          // Random password since this is a newsletter signup, not account creation
          password: crypto.randomUUID(),
        },
      },
    });

    const errors = data.customerCreate.customerUserErrors;

    if (errors.length > 0) {
      // If the customer already exists, treat it as a success
      const alreadyExists = errors.some((e) => e.code === "TAKEN");
      if (alreadyExists) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }

      return NextResponse.json({ error: errors[0].message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
