import { children } from "solid-js"

export const Field = (props) => {
  const c = children(() => props.children)
  return (
    <div class="flex flex-wrap mt-10">
      {c()}
    </div>
  )
};
