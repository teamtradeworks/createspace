import SectionTracker from "./SectionTracker";

interface Spec {
  label: string;
  value: string;
}

interface SpecificationsProps {
  title?: string;
  specs: Spec[];
  background?: "white" | "gray";
}

export function Specifications({
  title = "Specifications",
  specs,
  background = "gray",
}: SpecificationsProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <SectionTracker name="Specifications">
      <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-navy text-center mb-10">
          {title}
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <tbody>
              {specs.map((spec, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 text-sm font-medium text-navy w-1/3">
                    {spec.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </SectionTracker>

  );
}
