import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
export default function CalcomEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <button
      data-cal-namespace="30min"
      data-cal-link="pranjal-rana-bhoyu7/30min"
      data-cal-config='{"layout":"month_view"}'
    >
      <Button
        key={2}
        asChild
        size="lg"
        variant="ghost"
        className="h-10.5 rounded-xl px-5"
      >
        <span className="text-nowrap">Request a demo</span>
      </Button>
    </button>
  );
}
