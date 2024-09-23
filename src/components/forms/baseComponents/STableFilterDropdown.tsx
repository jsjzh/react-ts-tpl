import SCol from "@/components/SCol";
import SRow from "@/components/SRow";
import { useDebounceFn } from "ahooks";
import { Button, Checkbox, Empty, Input, InputRef, Spin } from "antd";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";

const Container = styled.div`
  width: 350px;
`;

const InputContainer = styled.div`
  padding: 8px;
`;

const SelectContainer = styled.div`
  padding: 8px;
  height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

// const CheckboxItem = styled(Checkbox)`
//   width: 100%;
//   padding: 5px;
// `;

const SelectedTitleContainer = styled.div`
  padding: 8px;
  text-align: center;
`;

const SelectedContainer = styled.div`
  padding: 8px;
  height: 150px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const ControllerContainer = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;

type ItemValue = { text: string | number; value: string | number };

export interface ISTableFilterDropdownIRefs {
  clear: () => void;
}

export interface ISTableFilterDropdownProps {
  show: boolean;
  loading?: boolean;
  options?: ItemValue[];

  onSearch?: (value: string) => void;
  onOk?: (values: (string | number)[]) => void;
}

const STableFilterDropdown = React.forwardRef<
  ISTableFilterDropdownIRefs,
  ISTableFilterDropdownProps
>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const selectedContainerRef = useRef<HTMLDivElement>(null);

  const [pageData, updatePageData] = useImmer<{
    inputValue?: string;
    selectValues: (string | number)[];
  }>({
    selectValues: [],
  });

  const handleClear = () => {
    selectContainerRef.current?.scrollTo({ top: 0 });
    selectedContainerRef.current?.scrollTo({ top: 0 });

    updatePageData((draft) => {
      draft.inputValue = undefined;
      draft.selectValues = [];
    });
  };

  useImperativeHandle(ref, () => ({ clear: handleClear }), []);

  const _handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch && props.onSearch(e.target.value);
  };

  const { run: handleInput } = useDebounceFn(_handleInput, { wait: 300 });

  const handleOk = () => {
    props.onOk && props.onOk(pageData.selectValues);
  };

  // useOnClickOutside(containerRef, handleOk);

  useEffect(() => {
    if (props.show) {
      inputRef.current?.focus();
    }
  }, [props.show]);

  return (
    <Container onKeyDown={(e) => e.stopPropagation()} ref={containerRef}>
      <Spin spinning={props.loading || false}>
        <InputContainer>
          <Input
            ref={inputRef}
            placeholder="输入搜索"
            value={pageData.inputValue}
            onChange={(e) => {
              updatePageData((draft) => {
                draft.inputValue = e.target.value;
              });
              handleInput(e);
            }}
          />
        </InputContainer>

        <SelectContainer ref={selectContainerRef}>
          {!(props.options || []).length ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="无筛选项"
            />
          ) : (
            <SRow>
              {(props.options || []).map((item) => (
                <SCol key={item.value} span={24}>
                  <Checkbox
                    style={{ width: "100%", padding: 5 }}
                    value={item.value}
                    checked={pageData.selectValues.includes(item.value)}
                    onChange={(e) => {
                      updatePageData((draft) => {
                        if (e.target.checked) {
                          draft.selectValues.push(item.value);
                        } else {
                          draft.selectValues = draft.selectValues.filter(
                            (value) => value !== item.value,
                          );
                        }
                      });
                    }}
                  >
                    {item.text}
                  </Checkbox>
                </SCol>
              ))}
            </SRow>
          )}
        </SelectContainer>

        <SelectedTitleContainer>已选项</SelectedTitleContainer>

        <SelectedContainer ref={selectedContainerRef}>
          {!pageData.selectValues.length ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="无已选项"
            />
          ) : (
            <Checkbox.Group
              value={pageData.selectValues}
              onChange={(values) => {
                updatePageData((draft) => {
                  draft.selectValues = values;
                });
              }}
            >
              <SRow>
                {pageData.selectValues.map((item) => (
                  <SCol key={item} span={24}>
                    <Checkbox
                      style={{ width: "100%", padding: 5 }}
                      value={item}
                    >
                      {item}
                    </Checkbox>
                  </SCol>
                ))}
              </SRow>
            </Checkbox.Group>
          )}
        </SelectedContainer>

        <ControllerContainer>
          <Button
            size="small"
            onClick={() => {
              updatePageData((draft) => {
                draft.selectValues = [];
              });
            }}
          >
            重置
          </Button>
          <Button size="small" type="primary" onClick={handleOk}>
            确定
          </Button>
        </ControllerContainer>
      </Spin>
    </Container>
  );
});

export default STableFilterDropdown;
