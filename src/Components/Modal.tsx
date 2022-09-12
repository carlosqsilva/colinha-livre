import { ComponentProps, Show, children } from "solid-js"
import { Portal } from "solid-js/web"

interface ModalProps extends ComponentProps<"div"> {
	isOpen: boolean;
	toggle: () => void;
	title: string
}

export const Modal = (props: ModalProps) => {
	const slot = children(() => props.children)

	return (
		<Portal mount={document.body}>
			<Show when={props.isOpen}>
				<>
					<div onClick={props.toggle} class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40" />
					<div role="dialog" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:h-full flex justify-center">
			    	<div class="relative p-4 w-full max-w-screen-md">
			        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full max-h-[80%] md:max-h-screen-md overflow-scroll">

			          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600 sticky top-0 z-50 bg-white">
			            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
			                {props.title}
			            </h3>

			            <button onClick={props.toggle} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
		                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		                <span class="sr-only">Close modal</span>
			            </button>
			          </div>

			          <div class="p-2 space-y-6">
			          	{slot()}
			          </div>
			        </div>
			    	</div>
					</div>
				</>
			</Show>
		</Portal>
	)
}
