import { children } from "solid-js"

export const Field = (props) => {
  const c = children(() => props.children)
  return (
    <div class="flex flex-col md:flex-row gap-2 md:gap-4 items-center flex-wrap mt-10">
      {c()}
    </div>
  )
};
