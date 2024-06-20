interface ITabPanelProps {
  value: number;
  index: number;
  children?: React.ReactNode;
}
function TabPanel(props: ITabPanelProps) {
  if (props.value === props.index) {
    return <div>{props.children}</div>;
  }
  return null;
}
export default TabPanel;
