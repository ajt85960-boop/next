import { AppModule } from "@/lib/role";

export const appMenu: { label: string; path: string; module: AppModule }[] = [
  {
    label: "概览",
    path: "/overview",
    module: "overview",
  },
  {
    label: "设备管理",
    path: "/devices",
    module: "devices",
  },
  {
    label: "数据标注",
    path: "/annotation",
    module: "annotation",
  },
  {
    label: "人员管理",
    path: "/people",
    module: "people",
  },
];
