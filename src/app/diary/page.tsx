'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { CoolMode } from "@/components/ui/cool-mode";
import EmotionButton from "@/components/emotion-Button";
import howareu from '@/app/img/howareyou.png'
import Happy from '@/app/img/Happy.png'
import SoSo from '@/app/img/SoSo.png'
import InLove from '@/app/img/inLove.png'
import Sad from '@/app/img/Sad.png'
import Silly from '@/app/img/Silly.png'
import Anxious from '@/app/img/Anxious.png'
import Angry from '@/app/img/Angry.png'

export default function Diary() {
  return (
    <div>
        <div className="flex justify-center pt-10">
            <Image src={howareu} alt="How are you?" width={800}/> 
        </div>
        <div className="grid grid-rows-2 pt-3">
            <div className="grid grid-cols-3 justify-center">
                <div className="flex justify-end">
                    <EmotionButton 
                        imageSrc={Happy} 
                        altText="Happy" 
                        particleSrc="https://i.postimg.cc/WzRvMbVY/Happy.png" 
                        imageSize={120}
                        date="21" 
                        buttonText="Happy"
                    />
                </div>
                <div className="flex justify-center">
                    <EmotionButton 
                        imageSrc={SoSo} 
                        altText="SoSo" 
                        particleSrc="https://i.postimg.cc/4NLWM27s/SoSo.png" 
                        imageSize={90}
                        date="21" 
                        buttonText="SoSo"
                    />
                </div>
                <div className="flex justify-start">
                    <EmotionButton 
                        imageSrc={InLove} 
                        altText="InLove" 
                        particleSrc="https://i.postimg.cc/Gt0NqnXJ/inLove.png" 
                        imageSize={120}
                        date="21" 
                        buttonText="In Love"
                    />
                </div>
            </div>
            <div  className="grid grid-cols-4 justify-center pt-5">
                <div className="flex justify-center">
                    <EmotionButton 
                        imageSrc={Sad} 
                        altText="Sad" 
                        particleSrc="https://i.postimg.cc/yY0WCpsM/Sad.png" 
                        imageSize={120}
                        date="21" 
                        buttonText="Sad"
                    />
                </div>
                <div className="flex justify-center">
                    <EmotionButton 
                        imageSrc={Anxious} 
                        altText="Anxious" 
                        particleSrc="https://i.postimg.cc/Rhn0BDSy/Anxious.png"
                        imageSize={150}
                        date="21" 
                        buttonText="Anxious"
                    />
                </div>
                <div className="flex justify-center">
                    <EmotionButton 
                        imageSrc={Angry} 
                        altText="Angry" 
                        particleSrc="https://i.postimg.cc/mD3syWrb/Angry.png"
                        imageSize={180}
                        date="21" 
                        buttonText="Angry"
                    />
                </div>
                <div className="flex justify-start pt-10">
                    <EmotionButton 
                        imageSrc={Silly} 
                        altText="Silly" 
                        particleSrc="https://i.postimg.cc/Hkb75VCR/Silly.png" 
                        imageSize={200}
                        date="21" 
                        buttonText="Silly"
                    />
                </div>
            </div>
        </div>
    </div>
        
  );
}