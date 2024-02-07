import { WaybarWidgetGroup } from "./WaybarWidgetGroup";
import { WaybarCPUWidget } from "./Widgets/WaybarCPUWidget";
import { WaybarDiskWidget } from "./Widgets/WaybarDiskWidget";
import { WaybarRAMWidget } from "./Widgets/WaybarRAMWidget";
import { WaybarTitleWidget } from "./Widgets/WaybarTitleWidget";

export const Waybar = () => {
  return (
    <div className="flex w-full flex-row">
      <WaybarWidgetGroup>
        <WaybarCPUWidget variation={10} frequency={1000} cores={10} />
        <WaybarRAMWidget
          variation={0.5}
          frequency={1000}
          min={18}
          max={25}
          start={21}
          capacity={16}
        />
        <WaybarDiskWidget current={35.9} variation={4.1} capacity={160.3} />
      </WaybarWidgetGroup>

      <WaybarWidgetGroup>
        <WaybarTitleWidget />
      </WaybarWidgetGroup>
      {/*
      <WaybarWidgetGroup>
        <WaybarLockWidget />
        <WaybarTimeWidget />
        <WaybarShutdownWidget />
      </WaybarWidgetGroup>

      <WaybarWidgetGroup>
        <WaybarTemperatureWidget />
        <WaybarBatteryWidget />
      </WaybarWidgetGroup>

      <WaybarWidgetGroup>
        <WaybarBrightnessWidget />
        <WaybarVolumeWidget />
        <WaybarMicrophoneWidget />
      </WaybarWidgetGroup>

      <WaybarWidgetGroup>
        <WaybarTrayWidget />
        <WaybarWeatherWidget />
      </WaybarWidgetGroup>
      */}
    </div>
  );
};
