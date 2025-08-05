import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MeetingFormData {
  title: string;
  description: string;
  attendees: string;
  location: string;
  meetingType: string;
  date: Date;
  time: string;
  duration: string;
}

interface ScheduleMeetingFormProps {
  onSubmit: (data: MeetingFormData) => void;
  onCancel: () => void;
}

export const ScheduleMeetingForm = ({ onSubmit, onCancel }: ScheduleMeetingFormProps) => {
  const [date, setDate] = useState<Date>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<MeetingFormData>();

  const onFormSubmit = (data: MeetingFormData) => {
    if (date) {
      onSubmit({ ...data, date });
    }
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Meeting Title</Label>
          <Input
            id="title"
            placeholder="Project kickoff meeting"
            {...register("title", { required: "Meeting title is required" })}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Meeting agenda and objectives..."
            {...register("description")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendees">Attendees</Label>
          <Input
            id="attendees"
            placeholder="john@techcorp.com, sarah@codeenvision.com"
            {...register("attendees", { required: "At least one attendee is required" })}
          />
          {errors.attendees && <p className="text-sm text-destructive">{errors.attendees.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="meetingType">Meeting Type</Label>
            <Select onValueChange={(value) => setValue("meetingType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client-meeting">Client Meeting</SelectItem>
                <SelectItem value="team-standup">Team Standup</SelectItem>
                <SelectItem value="project-review">Project Review</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location/Link</Label>
            <Input
              id="location"
              placeholder="Conference Room A or Zoom link"
              {...register("location")}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select onValueChange={(value) => setValue("time", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select onValueChange={(value) => setValue("duration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          Schedule Meeting
        </Button>
      </div>
    </form>
  );
};