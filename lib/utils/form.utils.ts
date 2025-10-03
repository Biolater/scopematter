/**
 * Utility functions for form handling and change detection
 */

export interface FormChangeDetection<T> {
  getChangedFields: (current: T, original: T) => Partial<T>;
  hasChanges: (current: T, original: T) => boolean;
}

/**
 * Creates a change detection utility for form data
 */
export function createChangeDetector<T extends Record<string, any>>(): FormChangeDetection<T> {
  /**
   * Recursively compares objects and returns only changed fields
   */
  function getChangedFields(current: T, original: T): Partial<T> {
    const changes: Partial<T> = {};
    
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const currentValue = current[key];
        const originalValue = original[key];
        
        if (isObject(currentValue) && isObject(originalValue)) {
          const nestedChanges = getChangedFields(currentValue, originalValue);
          if (Object.keys(nestedChanges).length > 0) {
            changes[key] = nestedChanges as T[Extract<keyof T, string>];
          }
        } else if (currentValue !== originalValue) {
          changes[key] = currentValue;
        }
      }
    }
    
    return changes;
  }
  
  /**
   * Checks if there are any changes between current and original data
   */
  function hasChanges(current: T, original: T): boolean {
    return Object.keys(getChangedFields(current, original)).length > 0;
  }
  
  return { getChangedFields, hasChanges };
}

/**
 * Processes form data by converting empty strings to undefined for optional fields
 */
export function processFormData<T extends Record<string, any>>(data: T): T {
  const processed = { ...data };
  
  for (const key in processed) {
    if (processed.hasOwnProperty(key)) {
      const value = processed[key];
      
      if (typeof value === 'string' && value === '') {
        processed[key] = undefined as any;
      } else if (isObject(value)) {
        processed[key] = processFormData(value);
      }
    }
  }
  
  return processed;
}

/**
 * Type guard to check if value is an object
 */
function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
