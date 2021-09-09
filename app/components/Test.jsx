import React from 'react';
const { AppLayout, Button, Box, Cards, Header, CollectionPreferences, Pagination, TextFilter } = window[
  'AWS-UI-Components-React'
];

export default class Test extends React.Component {
  render() {
    return (
      <AppLayout
        content={<Content />} // Main content on the page, defined below
        contentType="cards"
      />
    );
  }
}

const [selectedItems, setSelectedItems] = React.useState([{ name: 'Item 2' }]);

const Content = () => (
  <Cards
    trackBy="name"
    cardDefinition={{
      header: e => e.name,
      sections: [
        {
          id: 'description',
          header: 'Description',
          content: e => e.description
        },
        {
          id: 'type',
          header: 'Type',
          content: e => e.type
        },
        {
          id: 'size',
          header: 'Size',
          content: e => e.size
        }
      ]
    }}
    onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
    selectedItems={selectedItems}
    cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
    items={[
      {
        name: 'Item 1',
        alt: 'First',
        description: 'This is the first item',
        type: '1A',
        size: 'Small'
      },
      {
        name: 'Item 2',
        alt: 'Second',
        description: 'This is the second item',
        type: '1B',
        size: 'Large'
      },
      {
        name: 'Item 3',
        alt: 'Third',
        description: 'This is the third item',
        type: '1A',
        size: 'Large'
      },
      {
        name: 'Item 4',
        alt: 'Fourth',
        description: 'This is the fourth item',
        type: '2A',
        size: 'Small'
      },
      {
        name: 'Item 5',
        alt: 'Fifth',
        description: 'This is the fifth item',
        type: '2A',
        size: 'Large'
      },
      {
        name: 'Item 6',
        alt: 'Sixth',
        description: 'This is the sixth item',
        type: '1A',
        size: 'Small'
      }
    ]}
    loadingText="Loading resources"
    selectionType="multi"
    visibleSections={['description', 'type', 'size']}
    empty={
      <Box textAlign="center" color="inherit">
        <b>No resources</b>
        <Box padding={{ bottom: 's' }} variant="p" color="inherit">
          No resources to display.
        </Box>
        <Button>Create resource</Button>
      </Box>
    }
    filter={<TextFilter filteringPlaceholder="Find resources" />}
    header={
      <Header counter={selectedItems.length ? '(' + selectedItems.length + '/10)' : '(10)'}>
        Common cards with selection
      </Header>
    }
    pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
    preferences={
      <CollectionPreferences
        title="Preferences"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        preferences={{
          pageSize: 6,
          visibleContent: ['description', 'type', 'size']
        }}
        pageSizePreference={{
          title: 'Select page size',
          options: [{ value: 6, label: '6 resources' }, { value: 12, label: '12 resources' }]
        }}
        visibleContentPreference={{
          title: 'Select visible content',
          options: [
            {
              label: 'Main distribution properties',
              options: [
                {
                  id: 'description',
                  label: 'Description'
                },
                { id: 'type', label: 'Type' },
                { id: 'size', label: 'Size' }
              ]
            }
          ]
        }}
      />
    }
  />
);
