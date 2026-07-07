import {
  getEntity,
  getEntitiesByType,
} from "@/data/entities/registry";

export { getEntity, getEntitiesByType };

export function entityExists(slug: string) {
  return !!getEntity(slug);
}