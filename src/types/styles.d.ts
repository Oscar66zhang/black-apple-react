// styles.d.ts

// 模块化样式声明
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

// 普通全局样式声明（可选：不需要导出内容）
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";
