/*
 
    _______      ,-----.    .-------.    ,---.   .--..-./`)  ________    ____     __  
   /   __  \   .'  .-,  '.  |  _ _   \   |    \  |  |\ .-.')|        |   \   \   /  / 
  | ,_/  \__) / ,-.|  \ _ \ | ( ' )  |   |  ,  \ |  |/ `-' \|   .----'    \  _. /  '  
,-./  )      ;  \  '_ /  | :|(_ o _) /   |  |\_ \|  | `-'`"`|  _|____      _( )_ .'   
\  '_ '`)    |  _`,/ \ _/  || (_,_).' __ |  _( )_\  | .---. |_( )_   | ___(_ o _)'    
 > (_)  )  __: (  '\_/ \   ;|  |\ \  |  || (_ o _)  | |   | (_ o._)__||   |(_,_)'     
(  .  .-'_/  )\ `"/  \  ) / |  | \ `'   /|  (_,_)\  | |   | |(_,_)    |   `-'  /      
 `-'`-'     /  '. \_/``".'  |  |  \    / |  |    |  | |   | |   |      \      /       
   `._____.'     '-----'    ''-'   `'-'  '--'    '--' '---' '---'       `-..-'        
                                                                                      

*/
import * as React from 'react'
import useKonami from 'react-use-konami'
import cornify from './cornify'

interface UseCornifyProps {
  keys?: string[]
  addCupcakeButton?: boolean
  addMagicalWords?: boolean
  younicorns?: string
}

interface UseCornify {
  remove: () => void
}

const defaultKeys = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export const useCornify = ({
  keys,
  addMagicalWords = true,
  addCupcakeButton = true,
  younicorns,
}: UseCornifyProps = {}): UseCornify => {
  const [code] = React.useState<string[]>(keys || defaultKeys)

  const initCornify = () => {
    cornify.start({ younicorns, addMagicalWords })
    cornify.add()
    if (addCupcakeButton) cornify.addCupcakeButton()
  }

  useKonami(initCornify, {
    code,
  })

  return { remove: cornify.remove }
}
