import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const NODES_QUERY = `
  query Nodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
        id
        availableForSale
        currentlyNotInStock
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
    nodes: ({ id: string; availableForSale: boolean; currentlyNotInStock: boolean } | null)[];
  }>({
    query: NODES_QUERY,
    variables: { ids: variantIds },
  });

  const availability: Record<string, { available: boolean; currentlyNotInStock: boolean }> = {};
  for (const node of data.nodes) {
    if (node) {
      availability[node.id] = {
        available: node.availableForSale,
        currentlyNotInStock: node.currentlyNotInStock,
      };
    }
  }

  return NextResponse.json({ availability });
}
