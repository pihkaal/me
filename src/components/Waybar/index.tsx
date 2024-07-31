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
import { WaybarTrayWidget } from "./Widgets/WaybarTrayWidget";
import { WaybarToggleThemeWidget } from "./Widgets/WaybarToggleThemeWidget";
import { WaybarWeatherWidget } from "./Widgets/WaybarWeatherWidget";

export const Waybar = () => {
  return (
    <div className="grid h-[37px] w-full select-none grid-cols-[1fr_max-content_1fr] grid-rows-1 gap-0">
      <div className="flex items-center gap-3">
        <WaybarWidgetGroup className="rounded-r-[5px] pl-[10px] pr-[14px]">
          <WaybarHomeWidget />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup>
          <WaybarCPUWidget variation={2} frequency={1000} cores={10} />
          <WaybarRAMWidget
            variation={1}
            frequency={3000}
            min={18}
            max={40}
            start={randomMinMax(20, 30)}
            capacity={16}
          />
          <WaybarDiskWidget current={35.9} variation={4.1} capacity={160.3} />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup>
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
        <WaybarWidgetGroup>
          <WaybarTemperatureWidget
            min={50}
            max={70}
            variation={1}
            frequency={7000}
          />

          <WaybarBatteryWidget frequency={7000} />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup>
          <WaybarBrightnessWidget />
          <WaybarVolumeWidget />
          <WaybarMicrophoneWidget />
        </WaybarWidgetGroup>

        <WaybarWidgetGroup>
          <WaybarTrayWidget />
          <WaybarWeatherWidget />
          <WaybarToggleThemeWidget />
        </WaybarWidgetGroup>
      </div>
    </div>
  );
};
