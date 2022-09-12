import { ComponentProps, For, JSX, Show, splitProps } from "solid-js";

interface Header<T = {}> {
  key: string;
  title: string;
  action?: (props: T) => JSX.Element;
}

interface TableProps<T = {}> extends ComponentProps<"table"> {
  header: Header<T>[];
  data: T[];
}

export const Table = (props: TableProps) => {
  const [local, other] = splitProps(props, ["header", "data"]);

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        {...other}
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:(bg-gray-700 text-gray-400)">
          <tr>
            <For each={local.header}>
              {(header) => (
                <th scope="col" class="px-6 py-3">
                  {header.title}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <Show when={local.data.length > 0}>
            <For each={local.data}>
              {(data, idx) => (
                <tr
                  class="bg-white dark:bg-gray-800 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  classList={{
                    "border-t border-gray-200 dark:border-gray-600":
                      idx() !== 0,
                  }}
                >
                  <For each={local.header}>
                    {(header, idx) => {
                      return (
                        <Show
                          when={idx() !== 0}
                          fallback={
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >
                              <Show
                                when={header.action}
                                fallback={data[header.key]}
                              >
                                {header.action(data)}
                              </Show>
                            </th>
                          }
                        >
                          <td class="px-6 py-4">
                            <Show
                              when={header.action}
                              fallback={data[header.key]}
                            >
                              {header.action(data)}
                            </Show>
                          </td>
                        </Show>
                      );
                    }}
                  </For>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
    </div>
  );
};
