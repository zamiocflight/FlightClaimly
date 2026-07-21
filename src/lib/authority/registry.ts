import { authorityRegistry } from "@/data/authority/registry";
import type { AuthoritySource } from "@/data/authority/shared/types";

export function getAuthoritySource(
  id: string
): AuthoritySource | undefined {
  return authorityRegistry.find((source) => source.id === id);
}

export function getAuthoritySources(
  ids: string[]
): AuthoritySource[] {
  return ids
    .map(getAuthoritySource)
    .filter(
      (source): source is AuthoritySource => source !== undefined
    );
}