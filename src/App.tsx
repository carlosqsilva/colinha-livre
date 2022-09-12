import { onMount, JSX, Show } from "solid-js"
import { createStore, produce } from "solid-js/store"
import html2canvas from "html2canvas";

import { InputDigits } from "./InputDigit"
import { Button, Field, Label, Modal, Table } from "./Components"
import { Search } from "./search"

interface Candidato {
  SG_UF: string;
  DS_CARGO: string;
  NR_CANDIDATO: number;
  NM_URNA_CANDIDATO: string;
  NR_PARTIDO: number;
  SG_PARTIDO: string;
}

interface State {
  presidente: string[];
  governo: string[];
  senado: string[];
  depFederal: string[];
  depEstadual: string[];
  modalOpen: boolean;
  searchResults: Candidato[];
  searchText: string
}

const defaultState: State = {
  presidente: ["", ""],
  governo: ["", ""],
  senado: ["", "", ""],
  depFederal: ["", "", "", ""],
  depEstadual: ["", "", "", "", ""],
  modalOpen: false,
  searchResults: [],
  searchText: ""
};

const [state, setState] = createStore(defaultState);

const cleanState = () => {
  setState("presidente", ["", ""]);
  setState("governo", ["", ""]);
  setState("senado", ["", "", ""]);
  setState("depFederal", ["", "", "", ""]);
  setState("depEstadual", ["", "", "", "", ""]);
}

const toggleModal = () => {
  setState("modalOpen", s => !s)
}

export const  App = () => {
  let printElement: HTMLDivElement;
  let search: Search;

  onMount(() => {
    search = new Search();
  })

  const handleSearch: JSX.EventHandlerUnion<HTMLFormElement, Event & {submitter: HTMLElement}> = (e) => {
    e.preventDefault()
    search.search(state.searchText, data => {
      setState(
        produce<State>(draft => {
          draft.searchResults = data.map(r => r.obj)
          draft.modalOpen = true
        })
      )
    })
  }

  const handleSelectCandidate = (data: Candidato) => {
    const cargo = data.DS_CARGO
    const number = data.NR_CANDIDATO.toString().split('')

    setState(
      produce<State>(draft => {
        draft.modalOpen = false;
        draft.searchResults = [];
        switch(cargo) {
          case "PRESIDENTE":
            draft.presidente = number;
            break;
          case "GOVERNADOR":
            draft.governo = number;
            break;
          case "DEPUTADO ESTADUAL":
            draft.depEstadual = number;
            break;
          case "DEPUTADO FEDERAL":
            draft.depFederal = number;
            break;
          case "SENADOR":
            draft.senado = number;
            break;
          default:
            console.log("Não encontrado")
        }
      })
    )
  }

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
  };

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

      <Modal title="Resultados" isOpen={state.modalOpen} toggle={toggleModal}>
        <Show when={state.searchResults.length > 0} fallback={null}>
          <Table data={state.searchResults} header={[
            {key: "NM_URNA_CANDIDATO", title: "Nome"},
            {key: "NR_CANDIDATO", title: "Numero"},
            {key: "SG_PARTIDO", title: "Partido"},
            {key: "SG_UF", title: "Estado"},
            {key: "action", title: "Ação", action: (data: Candidato) => (
              <Button text="usar" small onClick={() => handleSelectCandidate(data)} />
            )}
          ]} />
        </Show>
      </Modal>

      <div class="flex justify-center">
        <div id="area" class="py-8" ref={printElement}>
          <div class="flex justify-center flex-wrap mt-2">

            <form class="min-w-280px max-w-480px w-full" onSubmit={handleSearch}>   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="search" 
                  id="default-search" 
                  class="block p-4 pl-10 w-full text-lg text-gray-900 bg-gray-50 rounded-lg focus:outline-none border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                  placeholder="Pesquisar Candidato"
                  onInput={e => setState("searchText", e.currentTarget.value)}
                />
                <button 
                  type="submit" 
                  class="text-white absolute right-2.5 bottom-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Buscar
                </button>
              </div>
            </form>

          </div>
          <Field>
            <Label text="Dep. Federal" />
            <InputDigits 
              values={state.depFederal} 
              onChange={(values: string, i: number) => setState("depFederal", i, values)}
            />
          </Field>
          <Field>
            <Label text="Dep. Estadual/Distrital" />
            <InputDigits 
              values={state.depEstadual} 
              onChange={(values: string, i: number) => setState("depEstadual", i, values)}
            />
          </Field>
          <Field>
            <Label text="Senado" />
            <InputDigits 
              values={state.senado} 
              onChange={(values: string, i: number) => setState("senado", i, values)}
            />
          </Field>
          <Field>
            <Label text="Governo" />
            <InputDigits 
              values={state.governo} 
              onChange={(values: string, i: number) => setState("governo", i, values)}
            />
          </Field>
          <Field>
            <Label text="Presidente" />
            <InputDigits 
              values={state.presidente} 
              onChange={(values: string, i: number) => setState("presidente", i, values)}
            />
          </Field>
        </div>
      </div>

      <div class="flex justify-center flex-row gap-2">
        <Button onClick={cleanState} text="Limpar" />
        <Button onClick={handleDownloadImage} text="Imprimir/Salvar" />
      </div>

      <footer class="w-full h-16 bg-gray-700 absolute left-0 bottom-0 flex justify-center items-center text-white text-md">
        <span>
          Este é um fork de <a href="colinha.net" class="text-slate-300">colinha.net</a>
        </span>
      </footer>
    </div>
  );
}
