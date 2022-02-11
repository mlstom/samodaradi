import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId:'xqdb78qt',
    dataset: 'production',
    apiVersion:'2021-11-16',
    ignoreBrowserTokenWarning: true,
    token:'skmL74JHJfcyNwyevLqkOnAWSga7ZPrRC2jijPAWupc0PP2KudhvawPjhDnfyQZy5qFwqbnc89djLRLB4g04GjjkYZfmklrmImTnC4QzPFXY10D8KrWGcseqnUvlI1OcSKAMZGO83ZhZ7HT3iooTAPXBFcnKscd28thCG9ek5cq4xgXuXekR',

}
)

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);