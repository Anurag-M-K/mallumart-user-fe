import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTimeSlots, slotBooking } from "@/data/booking";
import { TSlot } from "@/app/type";
import { convertTo12HourFormat } from "@/utils/commonFunctions";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { toast } from "../ui/use-toast";
import { Spinner } from "flowbite-react";

type TslotData = {
  slotId: string;
  startTime: any;
  endTime: any;
  date: any;
};
export function AvailableTimeSlots({ storeId }: { storeId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [slotSelection, setSlotSelection] = useState<TslotData | null>(null);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData ,setUserData] = useState<any>(null)
  const token: string = userData?.token;
  
  
  useEffect(()=>{
    const user: any = localStorage.getItem("user");
    setUserData(JSON.parse(user));
  },[])

  const { data, isLoading, error } = useQuery({
    queryKey: ["time-slots", token],
    queryFn: () => fetchTimeSlots(storeId, token),
  });

  const mutation = useMutation({
    mutationFn: async (newBooking: any) => {
      setLoading(true);
      return slotBooking(slotSelection, token, storeId);
    },
    onSuccess: (data: any) => {
      setLoading(false);
      setSlotSelection(null);
      queryClient.invalidateQueries({ queryKey: ["time-slots", token] });
      setOpen(false);
      toast({
        variant: "default",
        description: (
          <div className="flex items-center">
            <CheckIcon color="green" className="mr-2" />
            <span className="first-letter:capitalize">{data?.message}</span>
          </div>
        ),
        duration: 4000,
      });
    },
    onError: () => {
      toast({
        variant: "default",
        description: (
          <div className="flex items-center">
            <CheckIcon color="green" className="mr-2" />
            <span className="first-letter:capitalize">
              Something went wrong
            </span>
          </div>
        ),
        duration: 2000,
      });
    },
  });

  const handleBookNow = () => {
    setLoading(true);
    if (slotSelection) {
      mutation.mutate({ slotSelection, token });
      setLoading(false);
    } else {
      setLoading(false);
      setErr("Please select a slot");
    }
  };
  const handleDialogTriggerClick = () => {
    if (!userData) {
      router.push("/auth/login");
    } else {
      setOpen(true);
    }
  };
  if (isLoading) return <Spinner />;
  if (error || !data) return <div className="mx-4"></div>;
  const timeSlots = Array.isArray(data) ? data : [];

  console.log("Data ",data)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          onClick={handleDialogTriggerClick}
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto  hover:text-white text-white"
        >
          Book Time Slot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Available Time Slot</DialogTitle>
          <DialogDescription>
            {!timeSlots?.length
              ? "There is no slot available"
              : "Select an available time slot to book your session."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {timeSlots?.map((item: any, index: any) => (
              <div className="bg-muted rounded-md p-4 flex flex-col gap-2">
                <div>
                  {" "}
                  <h3 className="text-[12px] sm:text-sm font-medium">
                    {convertTo12HourFormat(item?.startTime) +
                      " - " +
                      convertTo12HourFormat(item?.endTime)}
                  </h3>
                </div>

                <Button
                  onClick={() => {
                    setSlotSelection({
                      slotId: item?._id,
                      date: item?.date,
                      startTime: item?.startTime,
                      endTime: item?.endTime,
                    });
                    setErr("");
                  }}
                  variant="outline"
                  size="sm"
                  className={
                    slotSelection?.slotId === item?._id
                      ? "bg-gray-500 hover:bg-gray-500 hover:text-white text-white"
                      : "bgo-gray-200"
                  }
                >
                  {slotSelection?.slotId === item?._id ? "Selected" : "Select"}
                </Button>
              </div>
            ))}
          </div>

          {err !== "" && <p className="text-red-500 text-center">{err}</p>}

          {timeSlots.length ? (
            <Button
              onClick={handleBookNow}
              size="lg"
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto  hover:text-white text-white"
            >
              {loading ? <Spinner /> : "Book Now"}
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
