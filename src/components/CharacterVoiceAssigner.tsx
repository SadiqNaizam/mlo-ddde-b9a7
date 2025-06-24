import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Define types for clarity and reusability
export interface Character {
  id: string;
  name: string;
}

export interface Voice {
  id: string;
  name: string;
}

export type Assignments = Record<string, string>; // Maps character.id to voice.id

interface CharacterVoiceAssignerProps {
  characters: Character[];
  voices: Voice[];
  initialAssignments: Assignments;
  onSave: (newAssignments: Assignments) => void;
  onClose: () => void;
}

const CharacterVoiceAssigner: React.FC<CharacterVoiceAssignerProps> = ({
  characters,
  voices,
  initialAssignments,
  onSave,
  onClose,
}) => {
  const [localAssignments, setLocalAssignments] = useState<Assignments>(initialAssignments);
  console.log('CharacterVoiceAssigner loaded');

  // Effect to re-sync state if the initial props change (e.g., user opens modal for a different book)
  useEffect(() => {
    setLocalAssignments(initialAssignments);
  }, [initialAssignments]);

  const handleVoiceChange = (characterId: string, voiceId: string) => {
    setLocalAssignments(prev => ({ ...prev, [characterId]: voiceId }));
  };

  const handleSaveChanges = () => {
    onSave(localAssignments);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-2xl">Assign Character Voices</DialogTitle>
        <DialogDescription>
          Select a voice for each character to create your personalized audio experience. Your settings will be saved for this book.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[24rem] -mx-6 px-6">
        <div className="space-y-6 py-4">
          {characters.length > 0 ? (
            characters.map((character) => (
              <div key={character.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 md:gap-4">
                <Label htmlFor={`voice-for-${character.id}`} className="font-heading text-md md:text-right">
                  {character.name}
                </Label>
                <Select
                  value={localAssignments[character.id] || ''}
                  onValueChange={(voiceId) => handleVoiceChange(character.id, voiceId)}
                >
                  <SelectTrigger id={`voice-for-${character.id}`} className="col-span-1 md:col-span-2">
                    <SelectValue placeholder="Select a voice..." />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No characters detected in this section.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </DialogFooter>
    </>
  );
};

export default CharacterVoiceAssigner;