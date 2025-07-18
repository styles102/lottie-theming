import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import button from './assets/button.lottie'
import fireworks from './assets/fireworks.lottie'
import loading from './assets/loading.lottie'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { cn } from './lib/utils'

function App() {
  const [lottieTheme, setLottieTheme] = useState<string>('blue')
  const [hideButton, setHideButton] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const buttonRef = useRef<unknown | null>(null!)
  const fireWorksRef = useRef<unknown | null>(null!)

  useEffect(() => {
    if(!hideButton) return;

    setTimeout(() => {
      setShowFireworks(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireWorksRef.current?.play()
    }, 5000)
  }, [hideButton])

  return (
    <>
      <div className={cn('flex flex-col place-content-center h-svh')}>
        <div className={cn('grid grid-cols-12 gap-6')}>
          <div className={cn('col-span-full md:col-start-6 md:col-span-2')}>
            <Select onValueChange={(value) => setLottieTheme(value)}>
              <SelectTrigger className={cn('w-full')}>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'blue'}>Default</SelectItem>
                <SelectItem value={'green'}>Green</SelectItem>
                <SelectItem value={'red'}>Red</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={cn('col-span-full flex flex-col gap-6 md:flex-row md:justify-center')}>
            {!animationComplete ? (
              <div className={cn('relative w-[300px] h-[150px]')}>
                <div className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px]', hideButton && 'hidden')}>
                  <DotLottieReact
                    src={button}
                    themeId={lottieTheme}
                    dotLottieRefCallback={(dotLottie) => { 
                      dotLottie?.addEventListener('complete', () => setHideButton(true))
                      buttonRef.current = dotLottie
                    }}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    onClick={() => buttonRef.current?.play()}
                  />
                </div>
                <div className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px]', (!hideButton || showFireworks) && 'hidden')}>
                  <DotLottieReact
                    src={loading}
                    themeId={lottieTheme}
                    autoplay
                    loop
                  />
                </div>
                <div className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px]', (!showFireworks || animationComplete) && 'hidden')}>
                  <DotLottieReact
                    src={fireworks}
                    dotLottieRefCallback={(dotLottie) => { 
                      dotLottie?.addEventListener('complete', () => setAnimationComplete(true))
                      fireWorksRef.current = dotLottie
                    }}
                  />
                </div>
              </div>
            ): (
              <h3 className={cn('text-5xl')}>Animations Complete</h3>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
