import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Article } from "@/lib/zod/article";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <article {...props}>
      <HeadingPage>{article.title}</HeadingPage>
      {article.field_excerpt && (
        <div className="my-4 text-xl">{article.field_excerpt}</div>
      )}
      {article.field_images?.map((image) => (
        <>
          <figure key={image.id}>
            <Image
              src={absoluteUrl(image.field_image.field_media_image.uri.url)}
              width={768}
              height={480}
              style={{ width: 768, height: 480 }}
              alt={image.field_image.field_media_image.resourceIdObjMeta.alt}
              className="object-cover"
              priority
            />
            {image.field_image.field_media_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-center text-sm text-scapaflow">
                {image.field_image.field_media_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        </>
      ))}
      {article.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}
