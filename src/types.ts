type NotionPropertyBase<T extends string, P> = {
  id: string;
  type: T;
} & P;

type NotionAnnotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

type NotionRichTextObject = {
  type: "text";
  text: {
    content: string;
    link: null | { url: string };
  };
  annotations: NotionAnnotations;
  plain_text: string;
  href: null | string;
};

type NotionSelectOption = {
  id: string;
  name: string;
  color: string;
};

type PhoneNumberProperty = NotionPropertyBase<
  "phone_number",
  {
    phone_number: string | null;
  }
>;

type RichTextProperty = NotionPropertyBase<
  "rich_text",
  {
    rich_text: NotionRichTextObject[];
  }
>;

type UniqueIdProperty = NotionPropertyBase<
  "unique_id",
  {
    unique_id: {
      prefix: string | null;
      number: number | null;
    };
  }
>;

type SelectProperty = NotionPropertyBase<
  "select",
  {
    select: NotionSelectOption | null;
  }
>;

type MultiSelectProperty = NotionPropertyBase<
  "multi_select",
  {
    multi_select: NotionSelectOption[];
  }
>;

type NumberProperty = NotionPropertyBase<
  "number",
  {
    number: number | null;
  }
>;

type StatusProperty = NotionPropertyBase<
  "status",
  {
    status: NotionSelectOption | null;
  }
>;

type CreatedTimeProperty = NotionPropertyBase<
  "created_time",
  {
    created_time: string;
  }
>;

type EmailProperty = NotionPropertyBase<
  "email",
  {
    email: string | null;
  }
>;

type DateProperty = NotionPropertyBase<
  "date",
  {
    date: null | {
      start: string;
      end: string | null;
      time_zone: string | null;
    };
  }
>;

type TitleProperty = NotionPropertyBase<
  "title",
  {
    title: NotionRichTextObject[];
  }
>;

export type NotionPageProperties = {
  "Phone Number": PhoneNumberProperty;
  "Client Feedback": RichTextProperty;
  "Assigned Operator": RichTextProperty;
  ID: UniqueIdProperty;
  "Appointment Time": RichTextProperty;
  Notes: RichTextProperty;
  Diagnosis: RichTextProperty;
  "Service Type": SelectProperty;
  Device: RichTextProperty;
  "Client Bill": NumberProperty;
  Status: StatusProperty;
  "Created time": CreatedTimeProperty;
  Email: EmailProperty;
  "Device type": SelectProperty;
  "Repair Type": MultiSelectProperty;
  "Scheduled Date": DateProperty;
  "Client Name": RichTextProperty;
  "Payment Status": SelectProperty;
  "Repair Cost": NumberProperty;
  "Estimated Repair Time": RichTextProperty;
  "Reported Issue": RichTextProperty;
  Technician: SelectProperty;
  "Client Name 1": TitleProperty;
};

type NotionUser = {
  object: "user";
  id: string;
};

type NotionParent =
  | {
      type: "database_id";
      database_id: string;
    }
  | {
      type: "page_id";
      page_id: string;
    };

type NotionIcon =
  | {
      type: "emoji";
      emoji: string;
    }
  | {
      type: "external";
      external: {
        url: string;
      };
    }
  | null;
export type NotionPage = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;

  cover: null;
  icon: NotionIcon;

  parent: NotionParent;

  archived: boolean;
  in_trash: boolean;
  is_locked: boolean;

  properties: NotionPageProperties;

  url: string;
  public_url: string | null;
};
