import React, { useState } from 'react';
import {
  Button,
  GridItem,
  Label,
  Modal,
  ModalVariant,
  List, ListItem,
  SearchInput,
} from '@patternfly/react-core';

import { translate as __ } from 'foremanReact/common/I18n';
import { foremanUrl } from 'foremanReact/common/helpers';

import PropTypes from 'prop-types';

const Hosts = ({
  hosts, ignoredHosts,
}) => {
  const [modal, handleModal] = useState(false);
  const [modalHosts, setModalHosts] = useState([]);
  const [modalTitle, setModalTitle] = useState('Hosts');
  const [search, setSearch] = useState('');

  const loadModal = (items, title) => {
    setModalHosts(items);
    setModalTitle(title);
    setSearch('');
    handleModal(true);
  };
  return (
    <>
      <GridItem span={7}>
        {hosts.length > 0 && (<Label color="green" href="#" onClick={() => loadModal(hosts.map(h => h.name), __('Hosts'))}>{hosts.length}{' '}{hosts.length === 1 ? __('host') : __('hosts')}</Label>)}
        {' '}
        {ignoredHosts.length > 0 && (<Label color="orange" href="#" onClick={() => loadModal(ignoredHosts, __('Ignored hosts'))}>{ignoredHosts.length}{' '}{__('ignored')}</Label>)}
      </GridItem>
      <Modal
        variant={ModalVariant.small}
        title={modalTitle}
        position="top"
        isOpen={modal}
        onClose={() => handleModal(false)}
      >
        <SearchInput
          placeholder="Find by name"
          value={search}
          onChange={v => setSearch(v)}
          onClear={() => setSearch('')}
        />
        <List isPlain isBordered className="margin-top-16">
          {(search ? modalHosts.filter(h => (`${h}`).includes(search)) : modalHosts).map(h => (
            <ListItem>
              <Button
                component="a"
                href={foremanUrl(`/hosts/${h}`)}
                variant="link"
                target="_blank"
                isInline
              >
                {h}
              </Button>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
};

Hosts.propTypes = {
  hosts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  ignoredHosts: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
};

export default Hosts;
