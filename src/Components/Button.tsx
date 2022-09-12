import { ComponentProps } from "solid-js"

interface Props extends ComponentProps<"button"> {
  text: string
  small?: boolean
}

export const Button = (props: Props) => (
  <button 
    type="button" 
    class="font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    classList={{
      "py-2 px-3 text-xs": props.small,
      "py-3 px-5 text-base": !props.small
    }}
    onClick={props.onClick}
  >
    {props.text}
  </button>
)
