import { useMemo } from "react";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const useComponentWillMount = (func) => {
  useMemo(func, [])
}