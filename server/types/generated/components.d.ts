import type { Schema, Struct } from '@strapi/strapi';

export interface AboutHero extends Struct.ComponentSchema {
  collectionName: 'components_about_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface AboutImage extends Struct.ComponentSchema {
  collectionName: 'components_about_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface AboutText extends Struct.ComponentSchema {
  collectionName: 'components_about_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    text: Schema.Attribute.Blocks;
  };
}

export interface LayoutFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_sections';
  info: {
    displayName: 'Footer Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface MainDetails extends Struct.ComponentSchema {
  collectionName: 'components_main_details';
  info: {
    displayName: 'Details';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface MainFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_main_feature_cards';
  info: {
    displayName: 'Feature Card';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    cover: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MainHero extends Struct.ComponentSchema {
  collectionName: 'components_main_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    buttonHref: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    cover: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.Text;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.hero': AboutHero;
      'about.image': AboutImage;
      'about.text': AboutText;
      'layout.footer-section': LayoutFooterSection;
      'main.details': MainDetails;
      'main.feature-card': MainFeatureCard;
      'main.hero': MainHero;
      'shared.link': SharedLink;
    }
  }
}
