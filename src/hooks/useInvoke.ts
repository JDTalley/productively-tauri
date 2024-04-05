import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import useSWR from "swr";

export const invokeFetcher = async <TArgs extends Record<string, any>, TResult>(
  command: string,
  args?: TArgs
): Promise<TResult> => invoke<TResult>(command, args);

export const getJSON = async (command: string) => {
  const data: string = await invokeFetcher(command);
  const json = await JSON.parse(data);

  return json;
};

export const useInvoke = <TArgs extends Record<string, any>, TResult>(
  getCommand: string,
  setCommand: string,
  args?: TArgs
) => {
  const { data, mutate, error } = useSWR<TResult>(getCommand, getJSON);

  const update = React.useCallback(
    async (newData: TResult) => {
      const newDataString = JSON.stringify(newData);
      const result: string = await invokeFetcher(setCommand, {
        data: newDataString,
      });

      const json = await JSON.parse(result);

      return mutate(json, false);
    },
    [mutate, setCommand]
  );

  return {
    data,
    isLoading: !data,
    error,
    update,
  };
};
