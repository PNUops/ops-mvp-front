import Input from '@components/Input';
import RoundedButton from '@components/RoundedButton';
import TextArea from '@components/TextArea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateNotice } from 'apis/notices';
import useGoBack from 'hooks/useGoBack';
import { useToast } from 'hooks/useToast';
import { useState } from 'react';

const NoticeCreateTab = () => {
  const { goBack } = useGoBack();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: () => postCreateNotice({ title, description }),
    onSuccess: () => {
      toast(`공지사항이 작성 되었어요.`, 'success');
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      goBack();
    },
    onError: () => toast(`공지사항 작성에 실패했어요.`, 'error'),
  });

  const handleSave = () => createMutation.mutate();

  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-2xl font-bold">공지사항 작성</h3>
      <div className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4">
        <label htmlFor="title" className="m-2">
          제목
        </label>
        <Input id="title" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description" className="m-2">
          본문
        </label>
        <TextArea
          id="description"
          placeholder="본문을 입력해주세요"
          className="min-h-48"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <RoundedButton className="min-w-28" onClick={goBack}>
          취소
        </RoundedButton>
        <RoundedButton className="min-w-28" onClick={handleSave}>
          저장
        </RoundedButton>
      </div>
    </section>
  );
};

export default NoticeCreateTab;
