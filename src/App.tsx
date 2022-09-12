import { children } from "solid-js"
import { createStore } from "solid-js/store"
import html2canvas from "html2canvas";
import { InputDigits } from "./InputDigit"

const Label = ({text}: {text: string}) => (
  <span class="text-slate-900 text-2xl my-auto mr-4 mb-2 w-screen flex-1 text-center md:text-right">
    {text}
  </span>
)

const Field = (props) => {
  const c = children(() => props.children)
  return (
    <div class="flex flex-wrap mt-10">
      {c()}
    </div>
  )
}

const [values, setValues] = createStore({
  presidente: ["", ""],
  governo: ["", ""],
  senado: ["", "", ""],
  depFederal: ["", "", "", ""],
  depEstadual: ["", "", "", "", ""],
})

export const  App = () => {
  let printElement: HTMLDivElement;

  async function handleDownloadImage() {
    const element = printElement || document.body;

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL();
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `colinha.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  return (
    <div class="w-screen h-full min-h-screen bg-slate-200 text-center">
      <div class="flex flex-col bg-slate-700 py-4">
        <h1 class="text-white text-3xl md:text-5xl font-main">
          Já sabe em quem vai votar?
        </h1>
        <h2 class="text-white text-xl md:text-3xl font-main mt-2">
          Anote, salve, imprima e não esqueça no dia da eleição!
        </h2>

        <h2 class="text-white text-lg md:text-xl font-main mt-2">
          (essa é a ordem das urnas)
        </h2>
      </div>

      <div class="flex justify-center">
        <div id="area" class="py-8" ref={printElement}>
          <div class="flex flex-wrap mt-2">
            <h1 class="text-center text-2xl font-sans text-white font-bold bg-slate-700 w-[300px] m-auto rounded-lg py-2">colinha-livre</h1>
          </div>
          <Field>
            <Label text="Dep. Federal" />
            <InputDigits 
              values={values.depFederal} 
              onChange={(values: string, i: number) => setValues("depFederal", i, values)}
            />
          </Field>
          <Field>
            <Label text="Dep. Estadual/Distrital" />
            <InputDigits 
              values={values.depEstadual} 
              onChange={(values: string, i: number) => setValues("depEstadual", i, values)}
            />
          </Field>
          <Field>
            <Label text="Senado" />
            <InputDigits 
              values={values.senado} 
              onChange={(values: string, i: number) => setValues("senado", i, values)}
            />
          </Field>
          <Field>
            <Label text="Governo" />
            <InputDigits 
              values={values.governo} 
              onChange={(values: string, i: number) => setValues("governo", i, values)}
            />
          </Field>
          <Field>
            <Label text="Presidente" />
            <InputDigits 
              values={values.presidente} 
              onChange={(values: string, i: number) => setValues("presidente", i, values)}
            />
          </Field>
        </div>
      </div>
      
      <button
        // marginTop={8}
        // marginBottom={24}
        // className="font-main"
        // fontWeight={"medium"}
        // backgroundColor={"#262730"}
        // textColor={"white"}
        // _hover={{ bg: "red.600" }}
        // fontSize={"2xl"}
        // onClick={handleDownloadImage}
      >
        Imprimir/Salvar
      </button>
      <button
        // marginTop={8}
        // marginBottom={24}
        // marginLeft={2}
        // className="font-main"
        // fontWeight={"medium"}
        // backgroundColor={"#262730"}
        // textColor={"white"}
        // _hover={{ bg: "red.600" }}
        // fontSize={"2xl"}
        // onClick={handleClean}
      >
        Limpar
      </button>
      
      <footer class="w-full h-16 bg-gray-700 absolute left-0 bottom-0 flex justify-center items-center text-white text-md">
        <span>
          Este é um fork de <a href="colinha.net" class="text-slate-300">colinha.net</a>
        </span>
      </footer>
    </div>
  );
}
