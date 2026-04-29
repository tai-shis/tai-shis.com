import Panel from "@/app/components/panel";
import ImagePreview from "@/app/components/projects/image-preview";

interface ProjectTemplateProps {
  panelName: string;
  description: string;
  tags: string[];
  images?: string[];
}

export default function ProjectTemplate({ panelName, description, tags, images }: ProjectTemplateProps) {
  return (
    <Panel name={panelName} className="p-4">
      <div className="px-2 flex flex-col gap-3">
        <p className="text-sm text-muted">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-muted border border-border px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        {images && images.length > 0 && <ImagePreview images={images} />}
      </div>
    </Panel>
  );
}
