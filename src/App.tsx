import './App.css'
import 'github-markdown-css/github-markdown.css'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useStore from './store/GlobalStore'
import { Icon, Textarea } from '@tremor/react';
import 'remixicon/fonts/remixicon.css'
import { useState } from 'react'
import { RiCheckDoubleFill, RiFileCopyLine } from '@remixicon/react';
import Header from './components/Header'


function App() {
  const { markdown, setMarkdown } = useStore();
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(markdown)
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }
  return (
    <>
      <br className='md:hidden' />
      <div className='dark:text-white dark:bg-background-dark md:h-[100vh] flex justify-center items-center flex-col px-5'>
        <Header />
        <br />
        <div className='flex flex-col md:grid md:grid-cols-2 w-full h-[85vh] gap-5'>
          <div className='w-full h-1/2 md:h-full px-1 relative'>
            <Textarea placeholder='Type your markdown here...' name="" className='resize-none w-full h-full p-3 overflow-auto dark:bg-background-dark dark:focus-within:bg-background-dark hover:cursor-default focus:cursor-text dark:focus:bg-background-dark border-solid border-[1px] border-gray-800 rounded-md' value={markdown} onChange={(e) => setMarkdown(e.target.value)} id=""></Textarea>
            {
              markdown !== "" && <div className='absolute top-2 right-2 '>
                <div className='cursor-pointer p-0' onClick={handleCopy}>
                  <Icon icon={isCopied ? RiCheckDoubleFill : RiFileCopyLine} variant='simple' className='bg-transparent backdrop-blur-none' tooltip={isCopied ? `Copied` : 'Copy'} />
                </div>
              </div>
            }
          </div>
          <div className='w-full h-1/2 md:h-full p-1 border rounded-md overflow-y-auto border-gray-700'>
            <Markdown remarkPlugins={[remarkGfm]} className={'markdown-body h-fit p-2'}>{markdown}</Markdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
