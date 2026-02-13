import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const NODES_QUERY = `
  query Nodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
        id
        availableForSale
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  const { variantIds } = (await request.json()) as { variantIds: string[] };

  if (!variantIds?.length) {
    return NextResponse.json({ availability: {} });
  }

  const data = await shopifyFetch<{
    nodes: ({ id: string; availableForSale: boolean } | null)[];
  }>({
    query: NODES_QUERY,
    variables: { ids: variantIds },
  });

  const availability: Record<string, boolean> = {};
  for (const node of data.nodes) {
    if (node) {
      availability[node.id] = node.availableForSale;
    }
  }

  return NextResponse.json({ availability });
}
