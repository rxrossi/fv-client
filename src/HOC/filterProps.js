export default function filterProps(propsNamesToPass = [], allProps) {
  return propsNamesToPass.reduce((prev, curr) => ({
    ...prev,
    [curr]: allProps[curr],
  }), {});
}
