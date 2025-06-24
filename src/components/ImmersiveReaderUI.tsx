import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Users,
  Minus,
  Plus,
  BookText,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import CharacterVoiceAssigner from '@/components/CharacterVoiceAssigner';

const bookContent = {
  title: "A Tale of Two Cities",
  chapters: [
    {
      title: "Chapter I: The Period",
      content: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.`
    },
    {
        title: "Chapter II: The Mail",
        content: `It was the Dover road that lay, on a Friday night late in November, before the first of the persons with whom this history has business. The Dover road lay, as to him, beyond the Dover mail, as it lumbered up Shooter’s Hill. He walked uphill in the mire by the side of the mail, as the rest of the passengers did; not because they had the least relish for walking exercise, under the circumstances, but because the hill, and the harness, and the mud, and the mail, were all so heavy, that the horses had three times already come to a stop, besides once drawing the coach across the road, with the seemingly insane intention of returning to London. `
    },
    {
        title: "Chapter III: The Night Shadows",
        content: `A wonderful fact to reflect upon, that every human creature is constituted to be that profound secret and mystery to every other. A solemn consideration, when I enter a great city by night, that every one of those darkly clustered houses encloses its own secret; that every room in every one of them encloses its own secret; that every beating heart in the hundreds of thousands of breasts there, is, in some of its imaginings, a secret to the heart nearest it!`
    }
  ]
};

const ImmersiveReaderUI: React.FC = () => {
  console.log('ImmersiveReaderUI loaded');
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(30);

  useEffect(() => {
    // Hide body scrollbar when reader is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleFontSizeChange = (amount: number) => {
    setFontSize(prev => Math.max(12, Math.min(32, prev + amount)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col bg-background text-foreground"
    >
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6 flex-shrink-0 bg-background/80 backdrop-blur-sm">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/library" aria-label="Back to library">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-heading text-lg font-semibold truncate">{bookContent.title}</h1>
        <div className="w-10"></div> {/* Spacer to balance the header */}
      </header>
      
      {/* Content Area */}
      <main className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div
            className={cn(
              'mx-auto max-w-3xl p-8 sm:p-12 md:p-16 transition-all duration-200',
              fontFamily === 'serif' ? 'font-heading' : 'font-body'
            )}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
          >
            {bookContent.chapters.map((chapter, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-3xl font-bold mb-6">{chapter.title}</h2>
                <p>{chapter.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>

      {/* Footer Controls */}
      <footer className="flex h-20 flex-shrink-0 items-center justify-center gap-4 border-t bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Font Settings">
              <BookText className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Size</label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleFontSizeChange(-1)} disabled={fontSize <= 12}><Minus className="h-4 w-4"/></Button>
                  <span className="w-12 text-center font-mono text-sm">{fontSize}px</span>
                  <Button variant="outline" size="icon" onClick={() => handleFontSizeChange(1)} disabled={fontSize >= 32}><Plus className="h-4 w-4"/></Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Family</label>
                <ToggleGroup type="single" value={fontFamily} onValueChange={(value: 'serif' | 'sans') => value && setFontFamily(value)}>
                   <ToggleGroupItem value="serif" aria-label="Serif Font" className="font-heading">Serif</ToggleGroupItem>
                   <ToggleGroupItem value="sans" aria-label="Sans-serif Font" className="font-body">Sans</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex flex-grow items-center gap-3 max-w-xs">
          <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Slider
            value={[playbackProgress]}
            onValueChange={(value) => setPlaybackProgress(value[0])}
            max={100}
            step={1}
            aria-label="Playback progress"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Assign Character Voices">
              <Users className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-heading">Assign Character Voices</DialogTitle>
              <DialogDescription>
                Select a unique voice for each character to enhance your listening experience.
              </DialogDescription>
            </DialogHeader>
            <CharacterVoiceAssigner />
          </DialogContent>
        </Dialog>
      </footer>
    </motion.div>
  );
};

export default ImmersiveReaderUI;