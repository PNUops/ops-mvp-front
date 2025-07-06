import Input from '@components/Input';
import RoundedButton from '@components/RoundedButton';
import TextArea from '@components/TextArea';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getNoticeDetail, patchNotice, postCreateNotice } from 'apis/notices';
import { useToast } from 'hooks/useToast';
import { useEffect, useState } from 'react';

interface Props {
  noticeId?: number;
  onGoBack: () => void;
}

const NoticeEditSection = ({ noticeId, onGoBack }: Props) => {
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data: notice, isError } = useQuery({
    queryKey: ['noticeDetail', noticeId],
    queryFn: () => {
      if (!noticeId) throw new Error('noticeId is required');
      return getNoticeDetail(noticeId);
    },
    enabled: !!noticeId,
  });

  const createMutation = useMutation({
    mutationFn: () => postCreateNotice({ title, description }),
    onSuccess: () => {
      toast(`공지사항이 작성 되었어요.`, 'success');
      onGoBack();
    },
    onError: (error) => {
      toast(`공지사항 작성에 실패했어요. ${error.message}`, 'error');
    },
  });

  const editMutation = useMutation({
    mutationFn: () => patchNotice(noticeId!, { title, description }),
    onSuccess: () => {
      toast(`공지사항이 작성 되었어요.`, 'success');
      onGoBack();
    },
    onError: (error) => {
      toast(`공지사항 작성에 실패했어요. ${error.message}`, 'error');
    },
  });

  useEffect(() => {
    if (notice) {
      setTitle(notice.title || '');
      setDescription(notice.description || '');
    }
  }, [notice]);

  const handleSave = () => {
    if (noticeId) editMutation.mutate();
    else createMutation.mutate();
  };

  if (isError) {
    return <div className="text-red-500">공지사항을 불러오는 도중 오류가 발생했습니다</div>;
  }
  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-2xl font-bold">공지사항 생성/수정</h3>
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
        <RoundedButton className="min-w-28" onClick={onGoBack}>
          취소
        </RoundedButton>
        <RoundedButton className="min-w-28" onClick={handleSave}>
          저장
        </RoundedButton>
      </div>
    </section>
  );
};

export default NoticeEditSection;
