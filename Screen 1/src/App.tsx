import { useEffect } from "react";
import {
  ArrowRight,
  Check,
  FlaskConical,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <section className="flex px-12 py-10 justify-center w-full">
          <div className="max-w-[700px] flex flex-col gap-8 w-full">
            <div className="text-center flex flex-col items-center gap-3">
              <div className="inline-flex shadow-sm rounded-full bg-neutral-100 border-neutral-200 border-1 border-solid px-3 py-1 items-center gap-1.5">
                <Sparkles className="size-3.5 text-neutral-950" />
                <span className="font-medium uppercase text-neutral-500 text-[11px] tracking-[3.52px]">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-semibold text-neutral-950 text-4xl leading-[38px] tracking-tight">
                <span>Not Features.</span>
                <span className="text-neutral-500">Benefits.</span>
              </h2>
              <p className="max-w-xl text-neutral-500 text-sm leading-6">
                Skincare that treats the cause, not the symptom. Here is exactly
                how we compare to what everyone else is selling.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-2xl bg-white border-neutral-200 border-1 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-3">
                  <div className="size-10 rounded-full bg-neutral-100 flex justify-center items-center">
                    <ThumbsDown className="size-4 text-neutral-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-semibold text-neutral-500 text-base leading-6">
                      Traditional Brands
                    </CardTitle>
                    <CardDescription className="text-neutral-500/80 text-xs leading-4">
                      The old way of doing skincare.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-[#e7000b]/10 flex justify-center items-center">
                      <X className="size-3 text-[#e7000b]" />
                    </div>
                    <span className="decoration-muted-foreground/40 line-through text-neutral-500 text-xs leading-4">
                      Harsh Chemicals
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-[#e7000b]/10 flex justify-center items-center">
                      <X className="size-3 text-[#e7000b]" />
                    </div>
                    <span className="decoration-muted-foreground/40 line-through text-neutral-500 text-xs leading-4">
                      Temporary Results
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-[#e7000b]/10 flex justify-center items-center">
                      <X className="size-3 text-[#e7000b]" />
                    </div>
                    <span className="decoration-muted-foreground/40 line-through text-neutral-500 text-xs leading-4">
                      Generic Ingredients
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-[#e7000b]/10 flex justify-center items-center">
                      <X className="size-3 text-[#e7000b]" />
                    </div>
                    <span className="decoration-muted-foreground/40 line-through text-neutral-500 text-xs leading-4">
                      No Proven Track Record
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative shadow-[0_12px_30px_rgba(0,0,0,0.18)] rounded-2xl bg-neutral-900 text-neutral-50 border-neutral-200 border-1 border-solid p-6 gap-4 overflow-hidden">
                <div className="inline-flex font-semibold uppercase rounded-full bg-neutral-50/10 text-neutral-50 text-[9px] tracking-[2.88px] absolute right-4 top-4 px-2.5 py-1 items-center gap-1">
                  <Star className="size-2.5 fill-primary-foreground text-neutral-50" />
                  Recommended
                </div>
                <CardHeader className="p-0 gap-3">
                  <div className="size-10 rounded-full bg-neutral-50/10 flex justify-center items-center">
                    <ShieldCheck className="size-4 text-neutral-50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-semibold text-neutral-50 text-base leading-6">
                      Your Brand
                    </CardTitle>
                    <CardDescription className="text-neutral-50/70 text-xs leading-4">
                      Science-backed, skin-first care.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-neutral-50/12 flex justify-center items-center">
                      <Check className="size-3 text-neutral-50" />
                    </div>
                    <span className="font-medium text-neutral-50 text-xs leading-4">
                      Clinical Ingredients
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-neutral-50/12 flex justify-center items-center">
                      <Check className="size-3 text-neutral-50" />
                    </div>
                    <span className="font-medium text-neutral-50 text-xs leading-4">
                      Long-Term Results
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-neutral-50/12 flex justify-center items-center">
                      <Check className="size-3 text-neutral-50" />
                    </div>
                    <span className="font-medium text-neutral-50 text-xs leading-4">
                      Dermatologist Approved
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded-full bg-neutral-50/12 flex justify-center items-center">
                      <Check className="size-3 text-neutral-50" />
                    </div>
                    <span className="font-medium text-neutral-50 text-xs leading-4">
                      Track Record 98%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="relative shadow-[0_10px_24px_rgba(0,0,0,0.08)] rounded-2xl border-neutral-200 border-1 border-solid p-0 h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNsZWFyJTIwZ2xvd2luZyUyMHNraW4lMjBuYXR1cmFsJTIwYmVhdXR5fGVufDF8MXx8fDE3ODQxOTg1NjB8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Woman with clear glowing skin"
                className="object-cover absolute inset-0 w-full h-full"
                data-photoid="y2T5hT7pWx4"
                data-authorname="Icons8 Team"
                data-authorurl="https://unsplash.com/@icons8"
                data-blurhash="LOO3nODNY6%~EgS~?bw]yYtSR5WC"
              />
              <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.88),oklch(0.145_0_0/0.18))] absolute inset-0" />
              <div className="relative text-neutral-50 flex p-6 flex-col justify-end h-full">
                <div className="flex items-end gap-3">
                  <span className="leading-none font-semibold text-4xl leading-10 tracking-tight">
                    98%
                  </span>
                  <span className="text-neutral-50/80 text-xs leading-4 pb-1">
                    saw visible results in 4 weeks
                  </span>
                </div>
                <div className="flex mt-3 items-center gap-2">
                  <div className="-space-x-2 flex">
                    <div className="size-6 rounded-full bg-[#ffb900] border-neutral-50/80 border-2 border-solid" />
                    <div className="size-6 rounded-full bg-[#fe9a00] border-neutral-50/80 border-2 border-solid" />
                    <div className="size-6 rounded-full bg-[#f54900] border-neutral-50/80 border-2 border-solid" />
                  </div>
                  <span className="text-neutral-50/80 text-[11px] leading-4">
                    Trusted by 50,000+ people
                  </span>
                </div>
              </div>
            </Card>
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-white border-neutral-200 border-1 border-solid flex p-4 items-start gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-neutral-100 flex justify-center items-center">
                  <FlaskConical className="size-4 text-neutral-950" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-neutral-950 text-sm leading-5">
                    Clinically Proven
                  </span>
                  <span className="text-neutral-500 text-xs leading-4">
                    Every formula lab-tested for real efficacy.
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-white border-neutral-200 border-1 border-solid flex p-4 items-start gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-neutral-100 flex justify-center items-center">
                  <Leaf className="size-4 text-neutral-950" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-neutral-950 text-sm leading-5">
                    Clean Ingredients
                  </span>
                  <span className="text-neutral-500 text-xs leading-4">
                    No harsh chemicals, ever. Skin-safe only.
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-white border-neutral-200 border-1 border-solid flex p-4 items-start gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-neutral-100 flex justify-center items-center">
                  <HeartHandshake className="size-4 text-neutral-950" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-neutral-950 text-sm leading-5">
                    Derm Approved
                  </span>
                  <span className="text-neutral-500 text-xs leading-4">
                    Endorsed by certified dermatologists.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex pt-1 flex-col items-center gap-3">
              <Button className="shadow-sm font-medium rounded-xl bg-neutral-900 text-neutral-50 text-sm leading-5 px-5 h-11">
                <span>Discover the Difference</span>
                <ArrowRight className="size-4" />
              </Button>
              <span className="text-neutral-500 text-xs leading-4">
                30-day money-back guarantee — results or your money back.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
