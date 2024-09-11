import { WaybarWidgetGroup } from "./WaybarWidgetGroup";
import { WaybarCPUWidget } from "./Widgets/WaybarCPUWidget";
import { WaybarDiskWidget } from "./Widgets/WaybarDiskWidget";
import { WaybarRAMWidget } from "./Widgets/WaybarRAMWidget";
import { WaybarTitleWidget } from "./Widgets/WaybarTitleWidget";
import { WaybarHomeWidget } from "./Widgets/WaybarHomeWidget";
import { randomMinMax } from "~/utils/math";
import { WaybarTemperatureWidget } from "./Widgets/WaybarTemperatureWidget";
import { WaybarBatteryWidget } from "./Widgets/WaybarBatteryWidget";
import { WaybarBrightnessWidget } from "./Widgets/WaybarBrightnessWidget";
import { WaybarVolumeWidget } from "./Widgets/WaybarVolumeWidget";
import { WaybarMicrophoneWidget } from "./Widgets/WaybarMicrophoneWidget";
import { WaybarLockWidget } from "./Widgets/WaybarLockWidget";
import { WaybarTimeWidget } from "./Widgets/WaybarTimeWidget";
import { WaybarPowerWidget } from "./Widgets/WaybarPowerWidget";
import { WaybarToggleThemeWidget } from "./Widgets/WaybarToggleThemeWidget";
import { WaybarWeatherWidget } from "./Widgets/WaybarWeatherWidget";
import { cn, hideIf } from "~/utils/react";
import { useApp } from "~/hooks/useApp";

export const Waybar = () => {
  const { screenWidth } = useApp();

  return (
    <div className="grid h-[37px] w-full select-none grid-cols-[1fr_max-content_1fr] grid-rows-1 gap-0">
      <div className="flex items-center gap-3">
        <WaybarWidgetGroup className="rounded-r-[5px] pl-[10px] pr-[14px]">
          <WaybarHomeWidget />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup className={cn(hideIf(screenWidth < 705))}>
          <WaybarCPUWidget
            variation={1}
            frequency={3250 + randomMinMax(-100, 100)}
            cores={12}
            min={8}
            max={16}
          />
          <WaybarRAMWidget
            variation={1}
            frequency={5000 + randomMinMax(-100, 100)}
            min={18}
            max={40}
            start={1 + randomMinMax(20, 30)}
            capacity={16}
          />
          <WaybarDiskWidget current={35.9} variation={4.1} capacity={160.3} />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup className={cn(hideIf(screenWidth < 910))}>
          <WaybarTitleWidget />
        </WaybarWidgetGroup>
      </div>
      <div className="flex items-center">
        <WaybarWidgetGroup>
          <WaybarLockWidget />
          <WaybarTimeWidget />
          <WaybarPowerWidget />
        </WaybarWidgetGroup>
      </div>
      <div className="flex items-center justify-end gap-2">
        <WaybarWidgetGroup className={cn(hideIf(screenWidth < 1320))}>
          <WaybarTemperatureWidget
            min={50}
            max={70}
            variation={1}
            frequency={7000 + randomMinMax(-100, 100)}
          />

          <WaybarBatteryWidget frequency={7000 + randomMinMax(-100, 100)} />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup className={cn(hideIf(screenWidth < 970))}>
          <WaybarBrightnessWidget />
          <WaybarVolumeWidget />
          <WaybarMicrophoneWidget />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup className={cn(hideIf(screenWidth < 475))}>
          <WaybarWeatherWidget />
          <WaybarToggleThemeWidget />
        </WaybarWidgetGroup>
      </div>
    </div>
  );
};
