import { For, JSX } from "solid-js"

interface InputDigitsProps {
  values: string[],
  onChange: (v: string, index: number) => void 
}

const acceptedCharacters = /^[0-9]$/;

export const InputDigits = (props: InputDigitsProps) => {
  const inputs = Array.from<HTMLInputElement | undefined>({length: props.values.length});

  const onClick: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent> = ({currentTarget}) => {
    window.requestAnimationFrame(() => {
      currentTarget.setSelectionRange(0, 1);
    });
  }

  const onFocus: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = ({currentTarget}) => {
    currentTarget.setSelectionRange(0, 1);
  }

  const handleKeyDown = (e: KeyboardEvent & {currentTarget: HTMLInputElement}, index: number) => {
    switch (e.key) {
      case 'Backspace':
        e.preventDefault();
        if (!props.values[index]) {
          if (index > 0) {
            // this digit is empty, so backspace removes the previous digit
            // and focuses it
            props.onChange("", index - 1);
            const previousInput = inputs[index - 1]?.focus();
          }
        } else {
          // this digit is not empty, so backspace removes that digit
          props.onChange("", index);
          inputs[index].focus();
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        if (index > 0) {
          const previousInput = inputs[index - 1];
          if (previousInput) {
            previousInput.focus();
            window.requestAnimationFrame(() => {
              previousInput.setSelectionRange(0, 1);
            });
          }
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        if (index + 1 < props.values.length) {
          const nextInput = inputs[index + 1];
          if (nextInput) {
            nextInput.focus();
            window.requestAnimationFrame(() => {
              nextInput.setSelectionRange(0, 1);
            });
          }
        }
        break;
      default:
        if (e.key.length === 1 && !(e.metaKey || e.altKey || e.ctrlKey)) {
          e.preventDefault();
          if (acceptedCharacters.test(e.key)) {
            props.onChange(e.key, index);
            if (index + 1 < props.values.length) {
              const nextInput = inputs[index + 1];
              if (nextInput) {
                nextInput.focus();
                window.requestAnimationFrame(() => {
                  nextInput.setSelectionRange(0, 1);
                });
              }
            } else {
              const currentTarget = e.currentTarget;
              window.requestAnimationFrame(() => {
                currentTarget.setSelectionRange(0, 1);
              });
            }
          }
        }
    }
  }

  return (
    <div class="flex flex-1 gap-2">
      <For each={props.values} fallback={null}>
        {
          (value, index) => <input 
            ref={(el => inputs[index()] = el)}
            value={value}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={(e) => handleKeyDown(e, index())}
            maxlength={1}
            class="font-main font-bold w-55px h-50px border-rd text-center text-3xl" />
        }
      </For>
    </div>
  )
}
